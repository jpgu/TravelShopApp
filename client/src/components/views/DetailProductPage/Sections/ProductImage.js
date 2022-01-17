import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

    const [Image, setImages] = useState([])

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })

            setImages(images)
        }       
    }, [props.detail])    // [] 안의 값이 바뀔때마다 lifecycle 을 더 실행하라는 의미임

    return (
        <div>
            <ImageGallery items={Image} />
        </div>
    )
}

export default ProductImage
