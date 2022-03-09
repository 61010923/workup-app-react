import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { margin } from '@mui/system'
import { useNavigate } from 'react-router-dom'

export default function MediaCard(props) {
  const navigate = useNavigate()
  const {
    title, image, describe, cover, companyId,
  } = props
  return (
    <Card
      sx={{ maxWidth: 600, margin: 2, cursor: 'pointer' }}
      onClick={() => navigate(`/company/${companyId}`)}
    >
      <CardMedia
        component="img"
        height="60"
        image={image}
        alt="praYut"
      />
      <CardMedia
        component="img"
        height="200"
        image={cover}
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
        {/* <Button size="small">Share</Button> */}
        <Button size="small">More Info</Button>
      </CardActions>
    </Card>
  )
}
MediaCard.propTypes = {
  title: PropTypes.string,
  describe: PropTypes.string,
  image: PropTypes.string,
  cover: PropTypes.string,
  companyId: PropTypes.string,
}
MediaCard.defaultProps = {
  title: '',
  describe: '',
  image: '',
  cover: '',
  companyId: '',
}
