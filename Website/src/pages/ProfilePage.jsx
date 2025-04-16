import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  Box, Button, Flex, Input, Text, VStack, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalHeader,
  Menu, MenuList, MenuItem, Heading, Divider
} from '@chakra-ui/react';
import { getUser, updateUser } from '../api/User_API';
import { jwtDecode } from 'jwt-decode';
import Notiflix from 'notiflix';
import WebProfileImage from '../components/WebProfileImage';
import Header from '../components/Header';

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const WebProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', address: '', mobile: '', image: '' });
  const [originalData, setOriginalData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef(null);
  const [activeSection, setActiveSection] = useState('profile');

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSectionClick = (section) => {
    if (section === 'logout') {
      localStorage.removeItem('token');
      Notiflix.Notify.success('Logged out');
      window.location.href = '/';
    } else {
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const user = await getUser(decoded.id);
          setUserInfo(user);
          setFormData({
            firstName: user.name.split(" ")[0] || '',
            lastName: user.name.split(" ")[1] || '',
            address: user.address || '',
            mobile: user.mobile || '',
            image: user.image || 'default'
          });
          setOriginalData({
            firstName: user.name.split(" ")[0] || '',
            lastName: user.name.split(" ")[1] || '',
            address: user.address || '',
            mobile: user.mobile || '',
            image: user.image || 'default'
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  const hasChanges = useMemo(() => {
    return (
      formData.firstName !== originalData?.firstName ||
      formData.lastName !== originalData?.lastName ||
      formData.address !== originalData?.address ||
      formData.mobile !== originalData?.mobile ||
      formData.image !== originalData?.image
    );
  }, [formData, originalData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 200;
          const scale = MAX_WIDTH / img.width;
          const newWidth = MAX_WIDTH;
          const newHeight = img.height * scale;

          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          const compressedBase64 = canvas.toDataURL('image/jpeg');
          const base64String = compressedBase64.split(',')[1];

          setImagePreview(compressedBase64);
          setFormData((prev) => ({ ...prev, image: base64String }));
        };

        img.src = base64Image;
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: 'default' });
    setImagePreview(null);
    onClose();
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        mobile: formData.mobile,
        image: formData.image !== 'default' ? formData.image : 'default',
        imageType: formData.image.type || 'image/jpeg'
      };

      if (formData.image && formData.image !== 'default') {
        const base64SizeInBytes = (formData.image.length * (3 / 4)) - (formData.image.endsWith('==') ? 2 : formData.image.endsWith('=') ? 1 : 0);
        const sizeInMB = base64SizeInBytes / (1024 * 1024);
        if (sizeInMB > 5) {
          Notiflix.Notify.failure("Image is too large. Please use a smaller image.");
          return;
        }
      }

      await updateUser(userInfo._id, payload);
      Notiflix.Notify.success('Profile updated');
      window.location.reload();
      setOriginalData(formData);
    } catch (err) {
      console.error('Update failed', err);
      Notiflix.Notify.failure('Update failed');
    }
  };

  const imageURL = imagePreview
    ? imagePreview
    : formData.image === 'default'
      ? null
      : formData.image.startsWith('data:')
        ? formData.image
        : `${URL}/images/user-images/${formData.image}`;

  return (
    <div>
      <Header />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: '20px' }}>
        <Box
          w="250px"
          px={4}
          position="sticky"
          top="0"
          height="calc(100vh - 135px)"
          bg="white"
          zIndex="1"
          alignContent="center"
        >
          <VStack align="stretch" spacing={4} px={2} mt={4} borderRadius={10} justifyContent="center" backgroundColor="#151615bd" height="calc(100vh - 185px)" >
            <Button
              variant={activeSection === 'profile' ? 'solid' : 'ghost'}
              color={activeSection === 'profile' ? 'white' : '#4caf50'}
              backgroundColor={activeSection === 'profile' ? '#4caf50' : null}
              _hover={{ backgroundColor: activeSection === 'profile' ? '#4caf50' : "white" }}
              onClick={() => handleSectionClick('profile')}
            >
              My Profile
            </Button>
            <Button
              variant={activeSection === 'orders' ? 'solid' : 'ghost'}
              color={activeSection === 'orders' ? 'white' : '#4caf50'}
              backgroundColor={activeSection === 'orders' ? '#4caf50' : null}
              _hover={{ backgroundColor: activeSection === 'orders' ? '#4caf50' : "white" }}

              onClick={() => handleSectionClick('orders')}
            >
              My Orders
            </Button>
            <Button
              color="#e65e5e"
              _hover={{ backgroundColor: "#e65e5e", color: "white" }}
              variant="ghost"
              onClick={() => handleSectionClick('logout')}
            >
              Logout
            </Button>
          </VStack>
        </Box>

        <Box
          flex="1"
          overflowY="none"
          py={8}
          px={4}
          height="calc(100vh - 135px)"
        >
          {activeSection === 'profile' && (
            <>
              <Heading size="lg" mb={6} textAlign="center" backgroundColor="#151615bd" color="white" py={2} borderRadius={10}>My Profile</Heading>
              <Flex direction="column" align="center" mb={6} position="relative">
                <Box onClick={onOpen} cursor="pointer" position="relative">
                  {(formData.image === originalData?.image && !imagePreview) ? (
                    <WebProfileImage size={120} />
                  ) : formData.image === 'default' ? (
                    <Flex
                      bg="gray.200"
                      rounded="full"
                      width="120px"
                      height="120px"
                      align="center"
                      justify="center"
                      fontSize="4xl"
                      fontWeight="bold"
                      color="gray.600"
                    >
                      {formData.firstName?.[0]?.toUpperCase() || 'U'}
                    </Flex>
                  ) : (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  )}

                  <i
                    className="fa-solid fa-pen"
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      border: "2px solid #4caf50",
                      padding: '4px',
                      fontSize: '16px',
                      color: 'gray.600',
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </Flex>

              <div style={{ position: "relative", left: "45vw", bottom: "5vh" }}>
                <Menu isOpen={isOpen} onClose={onClose}>
                  <MenuList>
                    {formData.image === 'default' ? (
                      <MenuItem icon={<i className="fa-solid fa-upload"></i>} onClick={triggerFileSelect}>
                        Add Photo
                      </MenuItem>
                    ) : (
                      <>
                        <MenuItem icon={<i className="fa-solid fa-eye"></i>} onClick={() => setImageViewerOpen(true)}>
                          View Photo
                        </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-pen"></i>} onClick={triggerFileSelect}>
                          Change Photo
                        </MenuItem>
                        <MenuItem icon={<i className="fa-solid fa-trash"></i>} onClick={handleDeleteImage} color="red.500">
                          Delete Photo
                        </MenuItem>
                      </>
                    )}
                  </MenuList>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Menu>
                {/* Image viewer modal */}
                <Modal isOpen={imageViewerOpen} onClose={() => setImageViewerOpen(false)} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>View Photo</ModalHeader>
                    <ModalBody>
                      <img
                        src={imagePreview || imageURL}
                        alt="Full view"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: "10px"
                        }}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button backgroundColor="#4caf50" color="white" onClick={() => setImageViewerOpen(false)}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>

              <VStack spacing={4} mx={10}>
                <div className="row w-100 m-0 p-0">
                  <div className="col-6">
                    <Input
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row w-100">
                  <div className="col">
                    <Input
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row w-100">
                  <div className="col">
                    <Input
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                </div>

                {hasChanges && (
                  <Button colorScheme="green" width="20vh" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                )}
              </VStack>
            </>
          )}

          {activeSection === 'orders' && (
            <>
              <Heading size="lg" mb={6} textAlign="center" backgroundColor="#151615bd" color="white" py={2} borderRadius={10}>My Orders</Heading>
            </>
          )}
        </Box>
      </div>
    </div>
  );
};

export default WebProfilePage;
