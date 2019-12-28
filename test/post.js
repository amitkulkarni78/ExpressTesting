const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest'); 
process.env.NODE_ENV = 'dev';
const app = require('../app/app');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://localhost:27017/postdb',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}, (err)=>{
        if(err) console.log(err);
    });
});


describe('POST : OK', function() {

    var post = {title: 'this is a title', body: 'this is a body'};
    let createdPost;
      it('should add post', function(done) { 
        request(app).post('/api/post')
          .send(post)
          .end(function(err, res) {
            if(err){

            } else {
              createdPost = res.body.data;
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.contain.property('data');
              expect(res.body.data).to.contain.keys(['title', 'body','_id']); 
              expect(res.body.data.title).to.equal(post.title);
              expect(res.body.data.body).to.equal(post.body);
            }
            done();
          }); 
      });

      it('should get posts', function(done) { 
        request(app).get('/api/posts')
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200,'should return 200');
            expect(res.body).to.contain.property('data');
            expect(Array.isArray(res.body.data)).to.equal(true , 'should return array'); 
            if ( res.body.data.length > 0 ) expect(res.body.data[0]).to.contain.keys(['title','body','_id']);
            done(); 
          }); 
      });


      it('should get post', function(done) { 
        request(app).get('/api/post/'+createdPost._id)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200,'should return 200');
            expect(res.body).to.contain.property('data');
            expect(typeof res.body.data).to.equal('object' , 'should return array'); 
            if ( res.body.data) 
            expect(res.body.data).to.contain.keys(['title','body','_id']);
            done(); 
          }); 
      });

      it('should add post and update it ', function(done) { 
        post.title = 'this is a changed title';
        post.body= 'this is a changed body';
        request(app).put('/api/post/'+createdPost._id)
          .send(post)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.contain.property('data');
            expect(res.body.data).to.contain.keys(['title', 'body','_id']); 
            expect(res.body.data.title).to.equal(post.title);
            expect(res.body.data.body).to.equal(post.body);
            done();
          }); 
      });

      it('should delete a post ', function(done) { 
        request(app).delete('/api/post/'+createdPost._id)
          .send(post)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.contain.property('message');
            done();
          }); 
      });

      
});

describe('POST : fail', function() {
 
  var post = {title: 'this is a title'};

    it('should add post fail', function(done) { 
      request(app).post('/api/post')
        .send(post)
        .end(function(err, res) {
          if(err){
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.contain.property('message');
          }
          done();
        }); 
    });

    it('should update post fail', function(done) { 
      request(app).put('/api/post/wew213123')
        .send(post)
        .end(function(err, res) {
          if(err){
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.contain.property('message');
          }
          done();
        }); 
    });

    it('should delete post fail', function(done) { 
      request(app).delete('/api/post/wew213123')
        .end(function(err, res) {
          if(err){
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.contain.property('message');
          }
          done();
        }); 
    });

    it('should get post by id fail', function(done) { 
      request(app).get('/api/post/wew213123')
        .end(function(err, res) {
          if(err){
            expect(res.statusCode).to.equal(500);
            expect(res.body).to.contain.property('message');
          }
          done();
        }); 
    });
  
});