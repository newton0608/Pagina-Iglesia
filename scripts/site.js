const toggle = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");

if (toggle && menu) {
  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    menu.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const meetingName = document.querySelector("[data-next-meeting-name]");
const meetingDetails = document.querySelector("[data-next-meeting-details]");
const meetingLink = document.querySelector("[data-next-meeting-link]");

if (meetingName && meetingDetails && meetingLink) {
  const meetings = [
    { day: 1, hour: 19, minute: 30, name: "Discipulado Virtual", time: "7:30 PM", place: "En línea", href: "Enlaces/Discipulado.html", action: "Ver discipulado" },
    { day: 3, hour: 19, minute: 0, name: "Escuela Profética", time: "7:00 PM", place: "6ta calle 6-58 Zona 1, Barberena" },
    { day: 5, hour: 19, minute: 0, name: "Familiar Profético", time: "7:00 PM", place: "6ta calle 6-58 Zona 1, Barberena" },
    { day: 6, hour: 18, minute: 30, name: "Generación Peniel", time: "6:30 PM", place: "6ta calle 6-58 Zona 1, Barberena" },
    { day: 0, hour: 10, minute: 0, name: "Servicio Devocional", time: "10:00 AM", place: "6ta calle 6-58 Zona 1, Barberena" },
  ];
  const localClock = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Guatemala", year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", hourCycle: "h23",
  });
  const dateLabel = new Intl.DateTimeFormat("es-GT", {
    timeZone: "UTC", weekday: "long", day: "numeric", month: "long",
  });

  const updateMeeting = () => {
    const parts = Object.fromEntries(localClock.formatToParts(new Date()).map(({ type, value }) => [type, Number(value)]));
    const today = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    const dayOfWeek = today.getUTCDay();
    const currentMinutes = parts.hour * 60 + parts.minute;

    const next = meetings.map((meeting) => {
      let daysAway = (meeting.day - dayOfWeek + 7) % 7;
      if (daysAway === 0 && currentMinutes >= meeting.hour * 60 + meeting.minute) daysAway = 7;
      return { ...meeting, daysAway };
    }).sort((a, b) => a.daysAway - b.daysAway || (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute))[0];

    const meetingDate = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + next.daysAway));
    const when = next.daysAway === 0 ? "Hoy" : next.daysAway === 1 ? "Mañana" : dateLabel.format(meetingDate);

    meetingName.textContent = next.name;
    meetingDetails.textContent = `${when} · ${next.time} · ${next.place}`;
    meetingLink.href = next.href || "#contacto";
    meetingLink.textContent = next.action || "Cómo llegar";
  };

  updateMeeting();
  setInterval(updateMeeting, 60_000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateMeeting();
  });
}
