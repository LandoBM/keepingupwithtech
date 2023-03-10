const delCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id
              }),
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to delete comment');
        }
    }
};

document.querySelector('#deleteCom').addEventListener('submit', delCommentHandler)