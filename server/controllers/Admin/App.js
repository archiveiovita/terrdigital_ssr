const Room = require('../../models/room')
const User = require('../../models/user')
const Notification = require('../../models/notification')

class App {
    async init(req, res)
    {
        try {
            const employees = await User.find({type : 'employee'})
            return res.status(200).json({authUser: req.session.user, employees})
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async getNotifications(req, res)
    {
        try {
            const notifications = await Notification.find().sort({date: -1}).populate('user')
            return res.status(200).json({notifications})
        } catch (e) {
            return res.status(400).json({message: 'error'})
        }
    }
}

module.exports = function() {
    return new App()
}