'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import 'react-slideshow-image/dist/styles.css';
import { DescriptionItem } from './descriptionItem';
import Copy from 'icons/Copy.svg';
import styles from './propertyDetails.module.scss';
import Heart from '@/icons/heart_gray_property.svg';
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

export const PropertyDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

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
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/apartments_card.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={800}
                  height={500}
                  alt="Apartments"
                />
              </SwiperSlide>
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
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/apartments_card.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/images/propertyPage/propertyImg.png"
                  width={150}
                  height={100}
                  alt="Apartments"
                  className={styles.thumbImage}
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                Rent 3 bedroom apartment in Sunny Neighbourhood of 65 m2 in
                Colombo
              </h1>
              <p className={styles.subtitle}>
                12 Thorakolayaya, Middeniya Road
              </p>
            </div>
            <div className={styles.btnBlock}>
              <div className={styles.btn} data-tooltip-id={`tooltip-save`}>
                <Heart />
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
              {/* <Tooltip
                anchorSelect="#clickable-link"
                id={`tooltip-share-link`}
                style={{
                  background: '#5E5E5E',
                  color: '#fff',
                  opacity: `1`,

                  borderRadius: '12px',
                  padding: '12px 12px',
                  boxShadow: `0px 4px 18px 0px rgba(0, 0, 0, 0.17)`,
                }}
              >
                <div>Copy Link</div>
              </Tooltip> */}
            </div>
            <ul className={styles.descList}>
              <DescriptionItem name="Price:" value="54 244 Re/mo" />
              <DescriptionItem name="Floor area:" value="65 m2" />
              <DescriptionItem name="Available from:" value="Now" />
              <DescriptionItem name="Property type:" value="Apartment" />
              <DescriptionItem name="Bedrooms:" value="3  bedrooms" />
              <DescriptionItem name="Bathrooms:" value="1 bathroom" />
              <DescriptionItem name="Furnished:" value="Yes" />
              <DescriptionItem
                name="Verified by Rentouts:"
                value={<Verified />}
              />
            </ul>
          </div>
        </div>
        <div className={styles.mapBlock}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4716.148121078742!2d80.86475347010926!3d6.291039922933511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6ababfdfb95eb%3A0x9a48abdc3be10a2e!2zTWlkZGVuaXlhIFJkLCBFbWJpbGlwaXRpeWEsINCo0YDQuC3Qm9Cw0L3QutCw!5e0!3m2!1sru!2sua!4v1720551106085!5m2!1sru!2sua"
            width="150%"
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
