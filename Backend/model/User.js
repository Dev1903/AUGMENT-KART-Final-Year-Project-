const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    mobile: String,
    image : {type: String, default: null}
});

const User = mongoose.model('User', userSchema);

export default User;