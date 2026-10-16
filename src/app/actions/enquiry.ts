"use server";

export type EnquiryField = "name" | "phone" | "dates" | "travellers" | "city" | "package" | "message";

export type EnquiryState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<EnquiryField, string>>;
  /** Values echoed back so the form keeps them after a failed submit. */
  values?: Partial<Record<EnquiryField, string>>;
  /** True when the enquiry reached the configured webhook. */
  delivered?: boolean;
  /** Pre-filled WhatsApp summary of the enquiry, so the visitor can send it directly. */
  whatsappText?: string;
};

const LIMITS: Record<EnquiryField, number> = {
  name: 80,
  phone: 20,
  dates: 80,
  travellers: 3,
  city: 80,
  package: 120,
  message: 1200,
};

function field(formData: FormData, key: EnquiryField): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, LIMITS[key]) : "";
}

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  const trap = formData.get("company");
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success", delivered: true, message: "Thank you — we’ll be in touch soon." };
  }

  const values = {
    name: field(formData, "name"),
    phone: field(formData, "phone"),
    dates: field(formData, "dates"),
    travellers: field(formData, "travellers"),
    city: field(formData, "city"),
    package: field(formData, "package"),
    message: field(formData, "message"),
  } satisfies Record<EnquiryField, string>;

  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()-]+$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone or WhatsApp number, e.g. +91 98765 43210.";
  }
  if (values.travellers) {
    const n = Number(values.travellers);
    if (!Number.isInteger(n) || n < 1 || n > 200) errors.travellers = "Please enter the number of travellers (1–200).";
  }

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const summary = [
    "Radhe Radhe! I'd like to plan a trip.",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.dates && `Travel dates: ${values.dates}`,
    values.travellers && `Travellers: ${values.travellers}`,
    values.city && `Starting from: ${values.city}`,
    values.package && `Interested in: ${values.package}`,
    values.message && `Message: ${values.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  let delivered = false;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, summary, source: "website", receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      });
      delivered = res.ok;
      if (!res.ok) console.error(`[enquiry] webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
    }
  } else {
    console.info("[enquiry] received (no ENQUIRY_WEBHOOK_URL configured)\n" + summary);
  }

  return {
    status: "success",
    delivered,
    whatsappText: summary,
    message: delivered
      ? `Thank you, ${values.name}. Your enquiry has reached us — we’ll reply soon.`
      : `Thank you, ${values.name}. To make sure your enquiry reaches us, please send it to us directly using the button below.`,
  };
}
