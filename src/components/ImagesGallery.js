import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InfiniteScroll from 'react-infinite-scroll-component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    backgroundColor: '#f5f5f5'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const ImagesGallery = () => {
  const classes = useStyles()
  const [imagesGallery, setImagesGallery] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then(function (response) {
        setImagesGallery(imagesGallery => imagesGallery.concat(response.data))
        setPage(page => page + 1)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const fetchMoreData = () => {
    setTimeout(() => {
      fetchData()
    }, 2000)

  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '70px' }}>
      <InfiniteScroll
        dataLength={imagesGallery.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {imagesGallery && imagesGallery.map((item) => (
          <Card className={classes.root} key={item.id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {item.author[0]}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.author}
            />
            <CardMedia
              className={classes.media}
              image={item.download_url}
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon style={{ fill: 'red' }} />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))
        }
      </InfiniteScroll>
    </Container>
  )
}

export default ImagesGallery