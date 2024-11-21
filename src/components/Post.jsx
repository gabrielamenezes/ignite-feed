import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'
import { useState } from 'react'

export const Post = ({author, publishedAt, content}) => {

  const [comments, setComments] = useState(['Post muito bacana, hein?!'])
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  })

  function handleCreateNewComment(e) {
    e.preventDefault();
    setComments([...comments, newCommentText])
    setNewCommentText('');
  }

  function handleNewCommentChange(e) {
    e.target.setCustomValidity("")
    setNewCommentText(e.target.value)
  }
  function handleNewCommentInvalid(e) {
    e.target.setCustomValidity("Esse campo é obrigatório")
  }

  function deleteComment(commentToDelete) {
   //imutabilidade -> nunca alteramos um valor de uma variável na memória de uma aplicação, nós criamos um novo valor (um novo espaço na memória)
    const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete)
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentInputEmpty = newCommentText.length === 0;
  return (
    <article className={styles.post}>
        <header>
            <div className={styles.author}>
                <Avatar src={author.avatarUrl} hasBorder />
                <div className={styles.authorInfo}>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                </div>
            </div>
            
            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{`Publicado ${publishedDateRelativeToNow}`}</time>
        </header>

        <div className={styles.content}>
          {content.map(line => {
            if(line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if (line.type === 'link') {
              return <p key={line.content}><a href='#'>{line.content}</a></p>
            }
          })}
        </div>

        <form onSubmit={(e) => handleCreateNewComment(e)} className={styles.commentForm}>
            <strong>Deixe seu feedback</strong>

            <textarea
              required
              onInvalid={handleNewCommentInvalid}
              placeholder='Deixe um comentário'
              name='comment'
              onChange={(e) => handleNewCommentChange(e)} 
              value={newCommentText}
            />

            <footer>
                <button type='submit' disabled={isNewCommentInputEmpty}>Publicar</button>
            </footer>
        </form>


        <div className={styles.commentList}>
          {comments.map(comment => <Comment onDeleteComment={deleteComment} key={comment} content={comment} />)}
        </div>
    </article>
  )
}
