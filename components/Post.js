import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { gql } from 'apollo-boost';
import constants from '../constants';
import styles from '../styles';
import { useMutation } from 'react-apollo-hooks';

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View``;

const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-weight: 500;
`;

const Location = styled.Text`
    font-size: 12px;
`;

const IconsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 5px;
`;

const IconContainer = styled.View`
    margin-right: 10px;
`;

const InfoContainer = styled.View`
    padding: 10px;
`;

const Caption = styled.Text`
    margin: 3px 0;
`;

const CommentCount = styled.Text`
    opacity: .5;
    font-size: 13px;
`;

const Post = ({
    id,
    user,
    location,
    files = [],
    likeCount: likeCountProp,
    caption,
    comments = [],
    isLiked: isLikedProp
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: id
        }
    });
    const handleLike = () => {
        toggleLikeMutation();

        if (isLiked) {
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
    };

    return (
        <Container>
            <Header>
                <Touchable>
                    <Image
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                        source={{ uri: user.avatar }}
                    />
                </Touchable>
                <Touchable>
                    <HeaderUserContainer>
                        <Bold>{user.username}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                </Touchable>
            </Header>

            <Swiper showsPagination={false} style={{ height: constants.height / 2.5 }}>
                {files.map(file =>
                    <Image
                        key={file.id}
                        style={{ width: constants.width, height: constants.height / 2.5 }}
                        source={{ uri: file.url }}
                    />
                )}
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons
                                size={28}
                                color={isLiked ? styles.redColor : styles.blackColor}
                                name={Platform.OS === 'ios'
                                    ? isLiked
                                        ? 'ios-heart'
                                        : 'ios-heart-empty'
                                    : isLiked
                                        ? 'md-heart'
                                        : 'md-heart-empty'}
                            />
                        </IconContainer>
                    </Touchable>

                    <Touchable>
                        <IconContainer>
                            <Ionicons
                                size={28}
                                color={styles.blackColor}
                                name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
                            />
                        </IconContainer>
                    </Touchable>
                </IconsContainer>

                <Touchable>
                    <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
                </Touchable>

                <Caption>
                    <Bold>{user.username}</Bold> {caption}
                </Caption>

                <Touchable>
                    <CommentCount>See all {comments.length} comments</CommentCount>
                </Touchable>
            </InfoContainer>
        </Container>
    );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default Post;