const TELEGRAM_USER = "EvegeniiValerievich";

function sanitize(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 500);
}

function openTelegram(message) {
  const url = `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function initForm() {
  const form = document.querySelector("[data-lead-form]");
  const status = document.querySelector("[data-form-status]");
  const interestSelect = document.querySelector("[data-interest]");
  const ctaButtons = document.querySelectorAll("[data-interest-value]");

  if (!form) return;

  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-interest-value");
      if (interestSelect && value) {
        interestSelect.value = value;
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const contactInput = form.querySelector('[name="contact"]');
    const interestInput = form.querySelector('[name="interest"]');
    const commentInput = form.querySelector('[name="comment"]');

    const fields = [nameInput, contactInput, interestInput];
    let valid = true;

    fields.forEach((field) => {
      if (!field) return;
      const ok = sanitize(field.value).length > 0;
      field.classList.toggle("is-invalid", !ok);
      const hint = field.parentElement?.querySelector("[data-hint]");
      if (hint) {
        hint.textContent = ok ? "" : "Заполните поле";
      }
      if (!ok) valid = false;
    });

    if (!valid) {
      if (status) {
        status.textContent = "Проверьте обязательные поля";
        status.classList.add("is-error");
      }
      return;
    }

    const name = sanitize(nameInput.value);
    const contact = sanitize(contactInput.value);
    const interest = sanitize(interestInput.value);
    const comment = sanitize(commentInput?.value);

    const message = [
      "Заявка с сайта Экскурсии Пхукет Евгений",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Интерес: ${interest}`,
      comment ? `Комментарий: ${comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    openTelegram(message);

    if (status) {
      status.textContent = "Открываем Telegram - отправьте сообщение";
      status.classList.remove("is-error");
    }

    form.reset();
  });
}
