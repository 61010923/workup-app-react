import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { margin } from '@mui/system'

export default function MediaCard(props) {
  const { title, image, describe } = props
  return (
    <Card sx={{ maxWidth: 345, margin: 2, cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="praYut"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {describe}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
MediaCard.propTypes = {
  title: PropTypes.string.isRequired,
  describe: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
