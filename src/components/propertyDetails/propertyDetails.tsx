'use client';
import React, { useState, useEffect } from 'react';
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
import EditIcon from '@/icons/edit.svg';
import Map from '@/components/map/map';
import { useSession } from 'next-auth/react';

interface PropertyDetailsProps {
  property: PropertyProps;
  propertyId: string;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  propertyId,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { data: session } = useSession();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {
    title,
    address,
    city,
    floorArea,
    numberBedrooms,
    numberBathrooms,
    furnishing,
    createdAt,
    propertyType,
    monthlyRent,
    images = [],
    verified,
    ownerId,
  } = property;

  const formattedDate = formatDate(createdAt);
  const isOwner = session?.user?.id === ownerId;

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
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <Image
                    src={image}
                    width={isMobile ? 400 : 800}
                    height={isMobile ? 300 : 500}
                    alt={`Property image ${index + 1}`}
                    style={{ objectFit: 'cover' }}
                    className={styles.swiperImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              slidesPerView={2}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              breakpoints={{
                400: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1440: {
                  slidesPerView: 4,
                },
                1920: {
                  slidesPerView: 5,
                },
              }}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    width={isMobile ? 125 : 150}
                    height={isMobile ? 75 : 100}
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
                {title} in {city}
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
              <DescriptionItem name="Price:" value={`${monthlyRent} LKR/mo`} />
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
                value={verified ? <Verified /> : <Warning />}
              />
            </ul>
            {isOwner && (
              <div className={styles.editBlock}>
                <EditIcon />
                <p>Edit</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.mapBlock}>
          <Map address={address} city={city} />
        </div>
      </div>
    </section>
  );
};
