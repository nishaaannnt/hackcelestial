const AnnouncementsHandler = require('./announcement.handler');

async function getAnnouncements(req,res,next) {
    try {
        const result = await AnnouncementsHandler.getAnnouncementByQuery({},0,10,{},{_id:-1},'userId');
        res.json({message:"Success",data:result});
    } catch (error) {
        next(error);
    }
}

async function createAnnouncements(req,res,next) {
    try {
        let body = req.body;
        if(!req.body.hasOwnProperty("title") || !req.body.hasOwnProperty("post")) {
            return res.status(401).json({"message":"Invalid Request"})
        }
        console.log(req);
        body["userId"] = await AnnouncementsHandler.convertObjectId(req.user._id);
        console.log(body);
        const result = await AnnouncementsHandler.addAnnouncement(body);
        
        res.send({message:"Announcement Added"});
    } catch (error) {
        next(error);
    }
}

async function deleteAnnouncements(req,res,next) {
    try {
        if(!req.params.id) {
            return res.status(401).json({"message":"Invalid Request"})
        }
        const reqId = await AnnouncementsHandler.convertObjectId(req.params.id)
        const result = await AnnouncementsHandler.deleteAnnouncements({_id:reqId});
        res.send({message:"Announcement Deleted"});
    } catch (error) {
        next(error);
    }
}

async function updateAnnouncements(req, res, next) {
    try {
        if (!req.params.id) {
            return res.status(401).json({ message: "Invalid Request: Missing ID" });
        }
        const { title, post } = req.body;
        if (!title || !post) {
            return res.status(401).json({ message: "Invalid Request: Missing title or post" });
        }
        const reqId = await AnnouncementsHandler.convertObjectId(req.params.id);
        const updateData = {
            title: title,
            post: post,
        };
        const result = await AnnouncementsHandler.updateAnnouncements({ _id: reqId }, updateData);

        if (result.nModified === 0) {
            return res.status(404).json({ message: "Announcement not found or no changes made" });
        }
        res.send({ message: "Announcement Updated Successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAnnouncements: getAnnouncements,
    createAnnouncements: createAnnouncements,
    deleteAnnouncements: deleteAnnouncements,
    updateAnnouncements: updateAnnouncements,
}