const supertest = require('supertest');
const app = require('../index');
const request=supertest(app)

describe("test user Routes",function(){
    // /users
   xit('test post request for create new user',async ()=>{
    var res=await request.post("/users").send({userName:'hossam',password:'aaqq123'});
    expect(res.statusCode).toEqual(200)
    console.log(res.body)
    expect(res.body).toEqual(jasmine.objectContaining({userName:'ola ahmed'}))
   })

   it('testing get route to return all users',async ()=>{
    var res=await request.get("/users");
    // console.log(res.body);
    expect(res.body).toEqual(jasmine.any(Array))
    expect(res.body.length).toEqual(5)
   })

})