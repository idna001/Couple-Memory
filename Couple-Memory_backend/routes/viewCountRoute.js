const express=require('express')
const router=express.Router()
const {
    viewCount
} = require('../controllers/viewCountController')

router.get('/count',viewCount)

module.exports = router