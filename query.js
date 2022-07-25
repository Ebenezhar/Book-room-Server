db.users.insertMany([
    {
    "name":"customer1",
    "contact": 1235,
    "Date":new Date().toLocaleDateString("IN"),
    "startTime": 0,
    "endTime":12,
    "roomId":ObjectId("62de640e913d635ac4309d36")
    },
    {
        "name":"customer2",
        "contact": 125545,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 12,
        "endTime":24,
        "roomId":ObjectId("62de640e913d635ac4309d36")
    },
    {
        "name":"customer3",
        "contact": 115235,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 5,
        "endTime":15,
        "roomId":ObjectId("62de64c0913d635ac4309d38")
    },
    {
        "name":"customer3",
        "contact": 16424,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 5,
        "endTime":15,
        "roomId":ObjectId("62de64c0913d635ac4309d38")
    },
    {
        "name":"customer4",
        "contact": 11813,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 5,
        "endTime":15,
        "roomId":ObjectId("62de64a6913d635ac4309d37")
    },
    {
        "name":"customer5",
        "contact": 11813,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 5,
        "endTime":15,
        "roomId":ObjectId("62de64a6913d635ac4309d37")
    },
    {
        "name":"customer6",
        "contact": 11813,
        "Date":new Date().toLocaleDateString("IN"),
        "startTime": 5,
        "endTime":15,
        "roomId":ObjectId("62de640e913d635ac4309d36")
    }
])
db.products_db.find({},{ product_price: 1}).sort({ _id: 1 }).forEach(function(p) {
    db.products_db.remove({
        _id: {  $gt : p._id },
        "product_price": p.product_price
    })
})