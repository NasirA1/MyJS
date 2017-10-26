### Database Schema

#### Database
  customers

#### Design Document

  {
     "_id": "_design/customers",
     "_rev": "1-264db286894c95a6a7712c61fc125363",
     "language": "javascript",
     "views": {
         "all_customers": {
             "map": "function(doc) {\n  emit(doc._id, doc);\n}"
         }
     }
  }
