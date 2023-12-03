import moment from 'moment';

class GlobalService {
  #serverDomain = 'http://localhost:8000';

  get serverUrl() {
    return this.#serverDomain;
  }

  getDisplayTime(inputTime) {
    const time = moment(inputTime);
    const minutes = moment().diff(time, 'minutes');
    const hours = moment().diff(time, 'hours');
    const days = moment().diff(time, 'days');
    const months = moment().diff(time, 'months');
    const years = moment().diff(time, 'years');

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  }
}

const globalService = new GlobalService();
export default globalService;
