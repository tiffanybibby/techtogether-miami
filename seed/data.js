import db from "../db/connection.js";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import Organization from "../models/organization.js";
import bcrypt from "bcrypt";

const insertData = async () => {
    //reset
    await db.DropDatabase();

    const user1 = new User({
        first_name: Katherine,
        last_name: Williams, 
        username: katwill12,
        email: 'kaz3w@mail.com',
        password_digest: await bcrypt.hash('^G9H_aw_kE', SALT_ROUNDS) ,

    })
    await user1.save()

    const user2 = new User({
        first_name: 'Allie',
        last_name: 'Smith', 
        username: 'allies4',
        email: 'alliesm1th@mail.com',
        password_digest: await bcrypt.hash('Wz63FD_JkH', SALT_ROUNDS) ,

    })
    await user2.save()

    const org1 = new Organization({
        name: 'Clean Miami',
        rep_name: 'Victoria White',
        phone: '0123456789',
        email: 'cleanmiami@mail.com',
        password_digest: await bcrypt.hash('U21&F64Vkx', SALT_ROUNDS),
    })

    const org2 = new Organization({
        name: 'Sunny Days',
        rep_name: 'Regina Brown',
        phone: '9876543210',
        email: 'sunnydaysmi@mail.com',
        password_digest: await bcrypt.hash('K7s=xg6km5', SALT_ROUNDS),
    })
    const ads=[
    {
        organization_id: 'Sunny Days',
        date: '02/12/2023',
        time: '3:30 PM',
        location: 'Miami Beach',
        vounteer_amount: 35,
    },
    {
        organization_id: 'Miami Fresh',
        date: '03/11/2022',
        time: '8:30 AM',
        location: 'Miami Beach',
        vounteer_amount: 29,
    },
    ];
        
    //adds ads to db
    await Ad.insertMany(ads);
    console.log("Created Successfully");
    
    //close connection to database
    db.close();
};
insertData();