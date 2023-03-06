const addCommentHandler = async (e) => {
    e.preventDefault()
    const id = document.querySelector('.btn').getAttribute('data-id')
    const comment_text = document.querySelector('.commentBody').value.trim()
    // const id = document.querySelector('.btn').getAttribute('data-id')
console.log(id, comment_text)
    if (comment_text) {
        const response = await fetch (`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({comment_text: comment_text}),
            headers: {
                'Context-Type': 'application/json'
            },
        })
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Cannot add Comment')
        }
    }
}

document.querySelector('.comForm').addEventListener('submit', addCommentHandler)