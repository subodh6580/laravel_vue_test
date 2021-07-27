export default class Gate {

    constructor(user) {
        this.user = user;
    }

    isAdmin() {
        return this.user.type === 'admin';
    }

    isUser() {
        return this.user.type === 'user';
    }

    isHr() {
        return this.user.type === 'hr';
    }



    isAdminOrUserOrHr() {
        if (this.user.type === 'user' || this.user.type === 'admin' || this.user.type === 'hr') {
            return true;
        }
    }
}