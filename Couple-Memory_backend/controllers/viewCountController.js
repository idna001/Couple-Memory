const asyncHandler = require('express-async-handler')
const ViewCounter = require('../models/viewCountModel')

// @desc   Count site visits
// @route  PUT /site/count
// @access Public
const viewCount = asyncHandler(async (req, res) => {
    //check if the counter is already created
    let data = await ViewCounter.find({})
    if (data.length == 0) {
        let initCounter = await ViewCounter.create({
            counter: 1,
        })
        res.status(200).json({ "view": initCounter })
    }
    else {
        data[0].counter += 1
        data[0].save()
        res.status(200).json({ "view": data[0] })
    }

})

module.exports = {
    viewCount
}

