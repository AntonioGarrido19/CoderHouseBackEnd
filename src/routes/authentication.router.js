import { Router} from 'express'
import { usersManager } from '../dao/managers/session/UsersMongo.js'
import { hashData } from "../utils.js"
import passport from 'passport'

const router = Router()

router.post('/signup', async(req, res)=>{
const {first_name,last_name,username,password, email} = req.body
    if(!first_name || !last_name || !username || !password || !email){
        res.status(400).json({mensaje: 'Some data is missing'})
    }
    const userDB = await usersManager.findUser(username)
    if(userDB){
        return res.status(400).json({message: 'Username already in use'})
    }
    const hashPassword = await hashData(password)

    let newUser;

    if(email === 'adminCoder@coder.com') {
        newUser = usersManager.create({...req.body, password:hashPassword, isAdmin:true, user:false})
    } else {
        usersManager.create({...req.body, password:hashPassword})
    }
    res.redirect('/api/views/product')
})

//passport github

router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/github', passport.authenticate('github',{failureRedirect: '/api/views/login'}), async (req, res)=>
{
    req.session.user = req.user
    req.session['username'] = req.user.username
    res.redirect('/api/views/products')
})



export default router