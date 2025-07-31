import React, { useState, useEffect } from "react";
import styles from './ProfilePage.module.css';
import { AppContext } from '../../context/AppContext';

const zodiacSigns = [
  "♈︎ Aries", "♉︎ Taurus", "♊︎ Gemini", "♋︎ Cancer", "♌︎ Leo", "♍︎ Virgo",
  "♎︎ Libra", "♏︎ Scorpio", "♐︎ Sagittarius", "♑︎ Capricorn", "♒︎ Aquarius", "♓︎ Pisces"
];

const defaultProfileData = {
  name: '',
  zodiacSign: '',
  currentBook: '',
  currentBookCover: '',
  bio: '',
  profilePhoto: '',
  headerPhoto: '',
  books: [],
};

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : defaultProfileData;
    } catch (e) {
      console.error('Failed to load saved profile:', e);
      return defaultProfileData;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', rating: 0, cover: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({ ...prev, [type]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCurrentBookCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({ ...prev, currentBookCover: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const toggleEdit = () => {
    if (isEditing) {
      localStorage.setItem('userProfile', JSON.stringify(profileData));
    }
    setIsEditing((prev) => !prev);
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.rating) return;
    setProfileData((prev) => ({
      ...prev,
      books: [...prev.books, newBook],
    }));
    setNewBook({ title: '', rating: 0, cover: '' });
  };

const handleDeleteBook = (index) => {
  const updatedBooks = [...profileData.books];
  updatedBooks.splice(index, 1);

  const updatedProfile = {
    ...profileData,
    books: updatedBooks,
  };

  setProfileData(updatedProfile);
  localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
};

  return (
    <div className={styles['profile-page']}>


   {/* HEADER SECTION */}
      <div className={styles['header-photo']}>
        {profileData.headerPhoto ? (
          <div className={styles['header-wrapper']}>
            <img src={profileData.headerPhoto} alt="Header" />
        
            <div className={styles['header-edit-overlay']}>
              <label className={styles['header-edit-button']}>
                📷 Edit Header
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'headerPhoto')}
                />
              </label>
            </div>
          
            {isEditing && (
              <label className={styles.customFileUpload}>
                Change Header Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'headerPhoto')}
                />
              </label>
            )}
          </div>
        ) : (
          <div className={styles['header-placeholder']}>
            <div>No Header Image</div>
       
            <label className={styles['header-upload-button']}>
              📷 Add Header Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'headerPhoto')}
              />
            </label>
          
            {isEditing && (
              <label className={styles.customFileUpload}>
                Upload Header Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'headerPhoto')}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {/* PROFILE SECTION */}
      <div className={styles['profile-section']}>
        <div className={styles.photo}>
          {profileData.profilePhoto ? (
            <img src={profileData.profilePhoto} alt="Profile" />
          ) : (
            <div className={styles['photo-placeholder']}>No Photo</div>
          )}

          {isEditing && (
            <label className={styles.customFileUpload}>
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profilePhoto')}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        <div className={styles.info}>
          {isEditing ? (
            <>
              <input
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />

              <select
                name="zodiacSign"
                value={profileData.zodiacSign}
                onChange={handleInputChange}
              >
                <option value="">Select Zodiac Sign</option>
                {zodiacSigns.map((sign) => (
                  <option key={sign} value={sign}>
                    {sign}
                  </option>
                ))}
              </select>

              <input
                name="currentBook"
                value={profileData.currentBook}
                onChange={handleInputChange}
                placeholder="Current Book"
              />

              <label className={styles.customFileUpload}>
                Upload Current Book Cover
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCurrentBookCoverUpload}
                />
              </label>

              {profileData.currentBookCover && (
                <img
                  src={profileData.currentBookCover}
                  alt="Current Book Cover"
                  style={{
                    width: '80px',
                    height: '120px',
                    objectFit: 'cover',
                    marginTop: '0.5rem',
                    borderRadius: '6px',
                  }}
                />
              )}

              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
            </>
          ) : (
            <>
              <h2>{profileData.name || 'Your Name'}</h2>
              <p><strong>Zodiac:</strong> {profileData.zodiacSign}</p>
              <p><strong>Reading 🕮 :</strong> {profileData.currentBook}</p>

              {profileData.currentBookCover && (
                <img
                  src={profileData.currentBookCover}
                  alt="Current Book Cover"
                  style={{
                    width: '80px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginTop: '0.5rem',
                  }}
                />
              )}
              <p>{profileData.bio}</p>
            </>
          )}

          <button onClick={toggleEdit}>
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* BOOKS SECTION */}
      <div className={styles['books-section']}>
  <h3>Books I've Completed 📚</h3>
<div className={styles['book-list']}>
  {profileData.books.map((book, idx) => (
    <div key={idx} className={styles['book-item']}>
      {book.cover ? (
        <img src={book.cover} alt="Cover" />
      ) : (
        <div className={styles['cover-placeholder']} />
      )}
      <p>{book.title}</p>
      <p>⭐ {book.rating}</p>
      <button
        className={styles['delete-button']}
        onClick={() => handleDeleteBook(idx)}
      >
        Delete
      </button>
    </div>
  ))}
</div>


  <div className={styles['add-book']}>
    <h4>Add Book</h4>
    <input
      type="text"
      placeholder="Book Title"
      value={newBook.title}
      onChange={(e) =>
        setNewBook({ ...newBook, title: e.target.value })
      }
    />

    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${styles.star} ${
            newBook.rating >= star ? styles.filled : ''
          }`}
          onClick={() =>
            setNewBook({ ...newBook, rating: star })
          }
        >
          ★
        </span>
      ))}
    </div>

          <label className={styles.customFileUpload}>
            📖 Upload Book Cover
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setNewBook((prev) => ({ ...prev, cover: reader.result }));
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>

          <button onClick={handleAddBook}>Add Book</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
