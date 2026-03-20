import bcrypt from 'bcrypt';

let data = await bcrypt.hash("Coworking123.", 10);

console.log(data);