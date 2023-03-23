export const formatDateTime = (time: string) => {
    const dateTime = new Date(time);
    const today = new Date(Date.now()).getDate();
    const daysFromToday = today - dateTime.getDate();
  
    const getPluralDayForm = (n: number) => (
      (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ?
        'дня' : 'дней'
    );
    
    const day = (
      daysFromToday === 0 ?
        'Сегодня' :
        daysFromToday === 1 ?
          'Вчера' : 
          `${daysFromToday} ${getPluralDayForm(daysFromToday)} назад`
    );
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const mins = dateTime.getMinutes().toString().padStart(2, '0');
    const timeZone = new Intl.NumberFormat("ru-RU", {signDisplay: "exceptZero"})
      .format(
        0 - dateTime.getTimezoneOffset() / 60
      );
  
    return (`${day}, ${hours}:${mins} i-GMT${timeZone}`);
  }