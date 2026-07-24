import { OPENING_HOURS } from '../data/restaurantData';

export interface OpenStatus {
  isOpen: boolean;
  statusMessage: string;
  nextChangeMessage: string;
  currentDayName: string;
}

export function getRestaurantOpenStatus(): OpenStatus {
  const now = new Date();
  
  // Convert current time to Paris time zone offset / standard time calculation
  // We can construct Paris time or use local date in user browser assuming standard French timezone or local time
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentMinutesFromMidnight = currentHour * 60 + currentMinute;

  const todaySchedule = OPENING_HOURS.find(h => h.dayIndex === dayIndex) || OPENING_HOURS[0];

  // Parse open/close
  const [openH, openM] = todaySchedule.openTime.split(':').map(Number);
  const [closeH, closeM] = todaySchedule.closeTime.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutesFromMidnight >= openMinutes && currentMinutesFromMidnight < closeMinutes;

  let statusMessage = isOpen ? "OUVERT ACTUELLEMENT" : "FERMÉ ACTUELLEMENT";
  let nextChangeMessage = "";

  if (isOpen) {
    const minutesUntilClose = closeMinutes - currentMinutesFromMidnight;
    const hoursLeft = Math.floor(minutesUntilClose / 60);
    const minsLeft = minutesUntilClose % 60;
    if (hoursLeft > 0) {
      nextChangeMessage = `Ferme à ${todaySchedule.closeTime} (dans ${hoursLeft}h${minsLeft > 0 ? minsLeft + 'm' : ''})`;
    } else {
      nextChangeMessage = `Ferme très bientôt (${minsLeft} min)`;
    }
  } else {
    if (currentMinutesFromMidnight < openMinutes) {
      const minutesUntilOpen = openMinutes - currentMinutesFromMidnight;
      const hoursLeft = Math.floor(minutesUntilOpen / 60);
      const minsLeft = minutesUntilOpen % 60;
      nextChangeMessage = `Ouvre aujourd'hui à ${todaySchedule.openTime} (dans ${hoursLeft > 0 ? hoursLeft + 'h' : ''}${minsLeft}m)`;
    } else {
      // Reopens tomorrow
      const tomorrowIndex = (dayIndex + 1) % 7;
      const tomorrowSchedule = OPENING_HOURS.find(h => h.dayIndex === tomorrowIndex) || OPENING_HOURS[0];
      nextChangeMessage = `Ouvre demain (${tomorrowSchedule.dayName}) à ${tomorrowSchedule.openTime}`;
    }
  }

  return {
    isOpen,
    statusMessage,
    nextChangeMessage,
    currentDayName: todaySchedule.dayName
  };
}
