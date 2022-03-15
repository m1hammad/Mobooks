const axios = require('axios')
const { response } = require('express')

const baseURL = 'https://www.googleapis.com/books/v1/volumes'

exports.api_books_get = (req, res) => {
    axios({
        method: 'get',
        url: baseURL +'?q=' + req.query.book
    })
    .then(response =>{
        // console.log(response.data.items)
        res.render('api/api', {apidata: response.data.items})
    })
    .catch(err => {
        console.log(err)
    })
}

exports.api_book_detail_get = (req, res) => {
    axios({
        method: 'get',
        url: baseURL + '/' + req.params.id
    })
    .then(response => {
        res.render('api/apidetails', {apidata: response.data})
    })
    .catch(err => {
        console.log(err)
    })
}