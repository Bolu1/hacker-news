import React from 'react';
import Cookie from 'js-cookie'
import { timeDifferenceForDate } from '../utils/time.utils';
import { gql, useMutation } from '@apollo/client';
import { FEED_QUERY } from './LinkList';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;


const Link = (props) => {
  const { link } = props;
  const authToken = Cookie.get('user');

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    },
    update: (cache, {data: {vote}}) => {
      const { feed } = cache.readQuery({
        query: FEED_QUERY
      });

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote]
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks
          }
        }
      });
    }
  });


  return (
    <div className="flex text-center mt2 items-start">
      <div className="flex text-center items-center">
        {/* <span className="gray">{props.index + 1}.</span> */}
        {authToken && (
          <div
            className="ml1 pt-6 text-center text-gray-700 f11"
            style={{ cursor: 'pointer' }}
            onClick={()=>vote()}
          >
            ▲
          </div>
        )}
      </div>
      <div className="mx-4 bg-gray-100 w-full p-5 my-1 rounded-md mx-auto text-center">
        <div>
          {link.description} <span className="text-blue-600 cursor-pointer hover:underline">({link.url})</span>
        </div>
        {(
          <div className="f6 lh-copy gray text-center">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;











