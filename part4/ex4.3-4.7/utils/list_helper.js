const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{
    
    return blogs.length == 0 ? 0 : blogs.length == 1 ? blogs[0].likes : blogs.reduce((prev,current)=>prev+current.likes,0)
}

const favoriteBlog = (blogs) =>{
    const result = blogs.reduce((prev,current)=>{
        return current.likes > prev.likes ? current : prev
    })
    delete result._id
    delete result.url
    delete result.__v
    return result
}

const mostBlogs = (blogs) =>{
    const authors = blogs.map(b=>b.author)
    const unique = [...new Set(authors)]
    const authorsBlogs = unique.map(e=> {
        return ({
            author:e,
            blogs:authors.filter(a=>a==e).length
        })
    })
    const result = authorsBlogs.reduce((prev,current)=>{
        return current.blogs > prev.blogs ? current:prev
    })

    return result

}

const mostLikes = (blogs) =>{
    let authorsLikes = {}
    blogs.forEach(e=>{
        if (e.author in authorsLikes) authorsLikes[e.author] += e.likes
        
        else authorsLikes[e.author] = e.likes
    })
    let Sorted = Object.entries(authorsLikes).sort((prev, next) => prev[1] - next[1])
    let highestLikes = Sorted.pop()
    return {author:highestLikes[0],likes:highestLikes[1]}
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}