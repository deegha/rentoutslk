'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import { DescriptionItem } from './descriptionItem';
import Copy from 'icons/Copy.svg';
import styles from './propertyDetails.module.scss';
import { PropertyFavourite } from '@/components';
import Share from '@/icons/share.svg';
import Verified from '@/icons/verified.svg';
import { Tooltip } from 'react-tooltip';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import Warning from '@/icons/warning.svg';
import { formatDate } from '@/utils/formateData';
import { PropertyProps } from '@/interface/property';

interface PropertyDetailsProps {
  property: PropertyProps;
  propertyId: string;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  propertyId,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

  const {
    title,
    address,
    place,
    floorArea,
    numberBedrooms,
    numberBathrooms,
    furnishing,
    createdAt,
    propertyType,
    monthlyRent,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    status,
  } = property;

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ].filter(
    (img): img is string => typeof img === 'string' && img.trim() !== '',
  );

  const formattedDate = formatDate(createdAt);
  const encodedAddress = encodeURIComponent(address);

  return (
    <section className={styles.container}>
      <div className={styles.propertyBlock}>
        <div className={styles.detailsBlock}>
          <div className={styles.imgBlock}>
            <Swiper
              style={{
                marginBottom: '8px',
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Pagination]}
              className="mySwiper2"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    width={800}
                    height={500}
                    alt={`Property image ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              slidesPerView={2}
              spaceBetween={10}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              breakpoints={{
                400: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    width={150}
                    height={100}
                    alt={`Property thumbnail ${index + 1}`}
                    className={styles.thumbImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                {title} in {place}
              </h1>
              <p className={styles.subtitle}>{address}</p>
            </div>
            <div className={styles.btnBlock}>
              <div className={styles.btn} data-tooltip-id={`tooltip-save`}>
                <PropertyFavourite id={propertyId} />
              </div>
              <Tooltip
                id={`tooltip-save`}
                style={{
                  background: '#5E5E5E',
                  color: '#fff',
                  opacity: `1`,
                  borderRadius: '12px',
                  padding: '12px 12px',
                  boxShadow: `0px 4px 18px 0px rgba(0, 0, 0, 0.17)`,
                }}
                place="bottom"
              >
                <div>Save</div>
              </Tooltip>
              <div
                className={styles.btn}
                data-tooltip-id={`tooltip-share`}
                id="clickable"
                data-tooltip-delay-hide={400}
              >
                <Share />
              </div>
              <Tooltip
                id={`tooltip-share`}
                style={{
                  background: '#fff',
                  color: '#5E5E5E',
                  opacity: `1`,
                  borderRadius: '12px',
                  padding: '12px 12px',
                  boxShadow: `0px 4px 18px 0px rgba(0, 0, 0,0.25)`,
                }}
                place="bottom-start"
                anchorSelect="#clickable"
                clickable
              >
                <div id="clickable-link" className={styles.copyBtnContainer}>
                  <h3>Share this property</h3>
                  <a
                    onClick={() => copyToClipboard()}
                    className={styles.copyContainer}
                  >
                    <Copy />
                    <span>Copy link</span>
                  </a>
                </div>
              </Tooltip>
            </div>
            <ul className={styles.descList}>
              <DescriptionItem name="Price:" value={`${monthlyRent} Re/mo`} />
              <DescriptionItem name="Floor area:" value={`${floorArea} m2`} />
              <DescriptionItem name="Available from:" value={formattedDate} />
              <DescriptionItem name="Property type:" value={propertyType} />
              <DescriptionItem
                name="Bedrooms:"
                value={`${numberBedrooms} bedrooms`}
              />
              <DescriptionItem
                name="Bathrooms:"
                value={`${numberBathrooms} bathroom`}
              />
              <DescriptionItem name="Furnished:" value={furnishing} />
              <DescriptionItem
                name="Verified by Rentouts:"
                value={status !== 'not verified' ? <Verified /> : <Warning />}
              />
            </ul>
          </div>
        </div>
        <div className={styles.mapBlock}>
          <iframe
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
            width="100%"
            height="280px"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
