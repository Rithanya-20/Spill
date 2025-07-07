const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
// const posts = require('./posts.json')
const path = require('path')


const app = express()
const port = 5000

//Middleware

app.use(cors())
app.use(bodyParser.json())

app.post('/api/users', (req, res) => {
    const newUser = req.body
    const {name, email, password} = req.body

    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = []

        if(!err && data) {
            users = JSON.parse(data)
        }
          const existingUser = users.findIndex(
            user => user.name === name && user.email === email && user.password === password
        )

        if(existingUser !== -1) {
            // return res.status(200).json({message: 'Login successful'})
            return res.status(200).json(users[existingUser])
        }



        users.push(newUser)

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if(err) {
                return res.status(500).json({message : 'Error writing file'})
            }
            res.status(200).json(newUser)
        })

    })

})

app.get('/api/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err) {
            return res.status(500).json({message: 'Users cannot be fetched'})
        }

        try {
            const users = JSON.parse(data)
            res.status(200).json(users)
            
        } catch (error) {
            res.status(500).json({message: 'Error parsing User data'})
        }
    })
})


app.post('/api/posts', (req, res) => {
    const newPost = req.body
  

    fs.readFile('posts.json', 'utf8', (err, data) => {
        let posts = []

        if(!err && data) {
            posts = JSON.parse(data)
        }

      
        posts.push(newPost)

        fs.writeFile('posts.json', JSON.stringify(posts, null, 2), (err) => {
            if(err) {
                return res.status(500).json({message: 'Post is not saved'})
            }

            return res.status(200).json({message: 'Post is saved successfully'})
        })
    })

    
})

app.get('/api/getPosts', (req, res) => {
    fs.readFile('posts.json', 'utf8', (err, data) => {
        if(err) {
            return res.status(500).json({message: 'Posts cannot be fetched'})
        }

        try {
            const posts = JSON.parse(data)
            res.status(200).json(posts)
            
        } catch (error) {
            res.status(500).json({message: 'Error parsing data'})
        }
    })
})

app.put('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id)
    const updateData = req.body

    const filePath = path.join(__dirname, 'posts.json')
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const postIndex = posts.findIndex(post => post.postId === postId)

    if(postIndex === -1){
        return res.status(500).json({message: 'Post not found'})
    }

    posts[postIndex] = {
        ...posts[postIndex],
        ...updateData
    }

    fs.writeFileSync(filePath,JSON.stringify(posts, null, 2), 'utf-8')

    return res.status(200).json(posts[postIndex])
})

app.post('/api/users/:id', (req, res)=> {
    const postData = req.body   

    fs.readFile('activity.json', 'utf8', (err, data) => {
        let activities = []

        if(!err && data) {
           activities = JSON.parse(data)
        }

        let existingUser = activities.find(user => user.userId === postData.userId)


       if(existingUser){
        return res.status(200).json({message: 'User already existing'})
       }

        activities.push(postData)
    

    fs.writeFile('activity.json', JSON.stringify(activities, null, 2), (err) => {
        if(err){
            return res.status(500).json({message: 'Activites are not stored'})
        }
        else{
            return res.status(200).json({message: 'Activities are captured'})
        }
    })
    })
})

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const updated = req.body
    const filename = path.join(__dirname, 'activity.json')
    const activities = JSON.parse(fs.readFileSync(filename, 'utf-8'))
    const userIndex = activities.findIndex(u => u.userId === userId)
    
    if(userIndex === -1){
        return res.status(500).json({message: 'User is not present'})
    }

    const existingUser = activities[userIndex]
    const incoming = updated.posts[0]

    
    
    const isPost = Object.hasOwn(existingUser, 'posts')
    
    let postIndex = -1
    let existingPost = []
    if(isPost){
    postIndex = existingUser.posts.findIndex(p => p.postId === incoming.postId)
    existingPost = existingUser.posts
    }

    //  if(isPost && postIndex !== -1)
    if(isPost && postIndex !== -1){
      existingUser.posts[postIndex] = {
        ...existingUser.posts[postIndex],
        ...incoming
      }


      activities[userIndex] = {
        ...existingUser
    }

    }
    else if(isPost && postIndex === -1){
        activities[userIndex] = {
        ...existingUser,
        posts: [...existingPost, incoming]     
        }

    }
    else{
        
        // existingUser.posts.push(JSON.stringify(incoming))
        // existingUser[posts] = incoming
        // console.log(existingUser);
        

         activities[userIndex] = {
        ...existingUser,
        posts: [incoming]
    }
        
    }
    

    // activities[userIndex] = {
    //     ...existingUser
    // }

    fs.writeFileSync(filename, JSON.stringify(activities, null, 2), 'utf-8')

    return res.status(200).json(activities[userIndex])
})

app.get('/api/users/activity', (req, res) => {
    fs.readFile('activity.json', 'utf8', (err, data) => {
        if(err) {
            return res.status(500).json({message: 'Activity cannot be fetched'})
        }

        try {
            const posts = JSON.parse(data)
            res.status(200).json(posts)
            
        } catch (error) {
            res.status(500).json({message: 'Error parsing data'})
        }
    })
})

app.put('/api/comment/:id', (req, res) => {
    const postId = parseInt(req.params.id)
    const updateData = req.body

    const filePath = path.join(__dirname, 'posts.json')
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    const postIndex = posts.findIndex(post => post.postId === postId)

    if(postIndex === -1){
        return res.status(500).json({message: 'Post not found'})
    }

    posts[postIndex].comments = [
        ...posts[postIndex].comments,
        updateData
    ]

    fs.writeFileSync(filePath,JSON.stringify(posts, null, 2), 'utf-8')

    return res.status(200).json(posts[postIndex])
})

app.listen(port, () => {
    console.log(`Server runnng on http://localhost:${port}`);
    
})