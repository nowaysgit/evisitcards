class UserDto {
    id;
    email;
    isActivated;
    role;
    passwordLastUpdate;

    constructor(model) {
        this.id = model.id
        this.email = model.email
        this.isActivated = model.isActivated
        this.role = model.role
        this.passwordLastUpdate = model.passwordLastUpdate
    }
}

export default UserDto