const HOTEL_WHATSAPP = "967772459459"; // استبدل الرقم برقم واتساب الفندق مع رمز الدولة دون +
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
checkin.min = localDate;
checkout.min = localDate;
checkin.addEventListener("change", () => {
  checkout.min = checkin.value || localDate;
  if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
});

document.querySelectorAll("[data-room]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("roomType").value = link.dataset.room;
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 5000);
}

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const arrival = checkin.value;
  const departure = checkout.value;
  if (!arrival || !departure || departure <= arrival) {
    showToast("يرجى اختيار تاريخ مغادرة بعد تاريخ الوصول.");
    return;
  }
  const room = document.getElementById("roomType").value;
  const guests = document.getElementById("guests").value;
  const message = `السلام عليكم، أرغب في الاستفسار عن حجز في فندق أفق صنعاء:\n- نوع الغرفة: ${room}\n- تاريخ الوصول: ${arrival}\n- تاريخ المغادرة: ${departure}\n- عدد النزلاء: ${guests}\nيرجى تأكيد التوفر والسعر الإجمالي.`;
  window.open(`https://wa.me/${HOTEL_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
document.getElementById("year").textContent = new Date().getFullYear();
