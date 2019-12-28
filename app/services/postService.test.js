const postService = require('./postService');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost:27017/postdb',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}, (err)=>{
        if(err) console.log(err);
    });
}); 
let post = {
    title: 'this is a mock post',
    body: 'this is a mock post body'
};
let createdPost ;

test('Post Service: OK : get posts',async (done) => {
   await postService.getposts().then(data => {
       expect(200,'should send 200 status');
       expect(Array.isArray(data)).toBe(true);
       done();
   }).catch((err) => {
       expect(typeof err).toBe('object');
       done();
   })
}, 10000);

test('Post Service: OK : add posts',async (done) => {      
    await postService.createpost(post).then(data => {
        expect(typeof data).toBe('object');
        createdPost = data;
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: OK : update posts',async (done) => { 
    post.title = "title changed";
    post.body = "body changed";   
    await postService.updatepost(createdPost._id, post).then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: OK : get posts',async (done) => {      
    await postService.getpost(createdPost._id).then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: OK : delete posts',async (done) => {      
    await postService.deletepost(createdPost._id).then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: FIAL : add posts fail', async (done) => {
    delete post.title;       
    await postService.createpost(post).then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    });
 }, 10000);

 test('Post Service: FIAL : delete posts fail',async (done) => {      
    await postService.deletepost('12334535').then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: FIAL : update posts fail',async (done) => {      
    await postService.updatepost('1233455',post).then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    })
 }, 10000);

 test('Post Service: FIAL : get posts fail',async (done) => {      
    await postService.getpost('1234345').then(data => {
        expect(typeof data).toBe('object');
        done();
    }).catch((err) => {
        expect(typeof err).toBe('object');
        done();
    });
 }, 10000);


mongoose.disconnect();