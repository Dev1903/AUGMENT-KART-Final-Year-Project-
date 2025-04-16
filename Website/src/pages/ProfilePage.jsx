import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Box, Button, Flex, Input, Text, VStack, Avatar, useToast, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalHeader, useDisclosure, Menu, MenuButton, MenuList, MenuItem, Heading, Divider } from '@chakra-ui/react';
import { getUser, updateUser } from '../api/User_API';
import { jwtDecode } from 'jwt-decode';
import Notiflix from 'notiflix';

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const WebProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', address: '', image: '' });
  const [originalData, setOriginalData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
            name: user.name || '',
            mobile: user.mobile || '',
            address: user.address || '',
            image: user.image || 'default'
          });
          setOriginalData({
            name: user.name || '',
            mobile: user.mobile || '',
            address: user.address || '',
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
      formData.name !== originalData?.name ||
      formData.mobile !== originalData?.mobile ||
      formData.address !== originalData?.address ||
      formData.image !== originalData?.image
    );
  }, [formData, originalData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Compress or resize the image before converting to base64
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const MAX_WIDTH = 200;  // Max width for the image (you can change this)
                const scale = MAX_WIDTH / img.width;
                const newWidth = MAX_WIDTH;
                const newHeight = img.height * scale;
                
                canvas.width = newWidth;
                canvas.height = newHeight;
                
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                
                // Get the base64 string of the compressed image
                const compressedBase64 = canvas.toDataURL('image/jpeg');  // JPEG compression
                const base64String = compressedBase64.split(',')[1];  // Remove the "data:image/jpeg;base64," part
                setImagePreview(compressedBase64);
                setFormData({ ...formData, image: base64String });
            };
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
            name: formData.name,
            mobile: formData.mobile,
            address: formData.address,
            image: formData.image,  // Send the base64 string directly here
        };
        
        // Make sure the request doesn't include unnecessary headers that could cause the payload size to exceed
        const response = await updateUser(userInfo._id, payload);
        
        Notiflix.Notify.success('Profile updated');
        setOriginalData(formData);
    } catch (err) {
        console.error('Update failed', err);
        Notiflix.Notify.failure('Update failed');
    }
};


  const imageURL =
    formData.image === 'default'
      ? null
      : formData.image.startsWith('data:') 
      ? formData.image
      : `${URL}/images/user-images/${formData.image}`;

  return (
    <Box maxW="md" mx="auto" py={8} px={4}>
      <Heading size="lg" mb={6}>My Profile</Heading>

      <Flex direction="column" align="center" mb={6} position="relative">
        {imageURL ? (
          <Avatar
            size="2xl"
            src={imageURL}
            cursor="pointer"
            onClick={onOpen}
          />
        ) : (
          <Avatar size="2xl" name={formData.name} onClick={onOpen} cursor="pointer" />
        )}

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
      </Flex>

      <VStack spacing={4}>
        <Input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          placeholder="Mobile"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <Input
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        {hasChanges && (
          <Button colorScheme="green" width="full" onClick={handleUpdate}>
            Save Changes
          </Button>
        )}
      </VStack>

      <Divider my={8} />

      <Flex justify="space-between">
        <Button leftIcon={<i className="fa-solid fa-box"></i>} colorScheme="blue">
          My Orders
        </Button>
        <Button leftIcon={<i className="fa-solid fa-right-from-bracket"></i>} colorScheme="red">
          Logout
        </Button>
      </Flex>

      {/* Image Viewer Modal */}
      <Modal isOpen={imageViewerOpen} onClose={() => setImageViewerOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Photo</ModalHeader>
          <ModalBody>
            <img src={imageURL} alt="Full Profile" style={{ width: '100%' }} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setImageViewerOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WebProfilePage;
