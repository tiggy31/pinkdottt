import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './style.js';

const Places = ({resource,selected,refProp}) => {

  const classes = useStyles()
if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})
   return(
    <Card elevation={6}>
    <CardMedia
      style={{ height: 350 }}
      image={resource.image_url ? resource.image_url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      title={resource.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">{resource.name}</Typography>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Rating name="read-only" value={Number(resource.rating)} readOnly />
        <Typography component="legend">{resource.review_count} review{resource.review_count > 1 && 's'}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography component="legend">Price</Typography>
        <Typography gutterBottom variant="subtitle1">
          {resource.price}
        </Typography>
      </Box>
    
      {resource?.catagories?.map((category) => (
        <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                 <Chip key={category} size="small" label={category} className={classes.chip} />
        </Box>
      ))}
       {resource.location.address1&& (
          <Typography gutterBottom variant="body1" color="textSecondary" className={classes.subtitle}>
         {resource.location.address1}  {resource.location.city} {resource.location.country}  {resource.location.state}  {resource.location.zip_code}
          </Typography>
        )}
      {resource.phone && (
        <Typography variant="body2" color="textSecondary" className={classes.spacing}>
          <PhoneIcon /> {resource.phone}
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => window.open(resource.url, '_blank')}>
        PINKDOT
      </Button>
    </CardActions>
  </Card>
);
}

export default Places