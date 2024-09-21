
async function uploadResume(req, res) {
    const fileName = req.file.filename;
    const id = req.body.userId;

    try {
        const applicant = await ApplicantSchema.findOne({
            userId: id,
        });
        if (!applicant) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }
        if (fileName) {
            applicant.resume = fileName;
        }

        await applicant.save();
        console.log(fileName);
        console.log(newFile);

        res.send({ status: "upload oke" });
    } catch (error) {
        res.json({ status: error });
    }

    console.log(storage);
}

async function uploadImage(req, res) {
    const { file } = req;

    if (
        file.detectedFileExtension != ".jpg" &&
        file.detectedFileExtension != ".png" &&
        file.detectedFileExtension != ".jpeg"
    ) {
        res.status(400).json({ message: "invalid format" });
    } else {
        const filename = `${uuidv4()}${file.detectedFileExtension}`;

        pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
        )
            .then(() => {
                res.send({
                    message: "Profile image uploaded successfully",
                    url: `/host/profile/${filename}`,
                });
            })
            .catch((err) => {
                res.status(400).json({ message: "Error while uploading" });
            });
    }
}