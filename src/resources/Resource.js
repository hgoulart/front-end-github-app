export default class Resource {


  static getBaseUrl() {
    return 'https://api.github.com/';
  }


  static async getUsers(page, number) {
    const url = `${this.getBaseUrl()}users?since=${page}&per_page=${number}`;
    const response = await fetch(url);
    return response.json();
  }

  static async getUser(username) {
    const url = `${this.getBaseUrl()}users/${username}`;
    const response = await fetch(url);
    return response.json();
  }

  static async getRepositories(username) {
    const url = `${this.getBaseUrl()}users/${username}/repos`;
    const response = await fetch(url);
    return response.json();
  }

  // 'https://api.github.com/user/repos?page=2&per_page=100'

  // https://api.github.com/users/zellwk/repos

}
