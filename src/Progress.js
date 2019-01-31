export default class Progress {
  constructor() {
    this.message = '';
    this.working = true
    this.query = '';
  }

  startDownload(query) {
    this.query = query;
  }

  setDownloaded(e) {
    this.message = `Downloading ${this.query} (${e.percent})`;
  }

  done() {
    this.working = false;
  }

  downloadError(message) {
    this.error = message;
  }

  reset() {
    this.error = null;
    this.message = '';
    this.working = true;
  }
}