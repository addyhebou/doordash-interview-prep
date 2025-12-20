'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type Comment = {
  value: string;
  likes: number;
  dislikes: number;
  id: number;
  timestamp: number;
};

export type CommentState = {
  comments: Map<number, Comment[]>;
  latestCommentID: number;
};

export type CommentAction =
  | { type: 'ADD_COMMENT'; payload: { pageIndex: number; comment: string } }
  | {
      type: 'VOTE';
      payload: { pageIndex: number; commentId: number; action: 'up' | 'down' };
    }
  | {
      type: 'LOAD_COMMENTS';
      payload: { pageIndex: number; comments: Comment[] };
    };

const initialState: CommentState = {
  comments: new Map<number, Comment[]>(),
  latestCommentID: 0,
};

function commentReducer(
  state: CommentState,
  action: CommentAction
): CommentState {
  switch (action.type) {
    case 'ADD_COMMENT': {
      const { pageIndex, comment } = action.payload;
      const newComment: Comment = {
        value: comment,
        likes: 0,
        dislikes: 0,
        id: state.latestCommentID,
        timestamp: Date.now(),
      };

      const currentComments = state.comments.get(pageIndex) || [];
      const newComments = new Map(state.comments);
      newComments.set(pageIndex, [...currentComments, newComment]);

      return {
        ...state,
        comments: newComments,
        latestCommentID: state.latestCommentID + 1,
      };
    }

    case 'VOTE': {
      const { pageIndex, commentId, action: voteAction } = action.payload;
      const currentComments = state.comments.get(pageIndex);

      if (!currentComments) return state;

      const newComments = new Map(state.comments);
      const updatedComments = currentComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: voteAction === 'up' ? comment.likes + 1 : comment.likes,
            dislikes:
              voteAction === 'down' ? comment.dislikes + 1 : comment.dislikes,
          };
        }
        return comment;
      });

      newComments.set(pageIndex, updatedComments);

      return {
        ...state,
        comments: newComments,
      };
    }

    case 'LOAD_COMMENTS': {
      const { pageIndex, comments } = action.payload;
      const newComments = new Map(state.comments);
      newComments.set(pageIndex, comments);

      return {
        ...state,
        comments: newComments,
      };
    }

    default:
      return state;
  }
}

type CommentContextType = {
  state: CommentState;
  addComment: (pageIndex: number, comment: string) => void;
  voteComment: (
    pageIndex: number,
    commentId: number,
    action: 'up' | 'down'
  ) => void;
  getCommentsForPage: (pageIndex: number) => Comment[];
};

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const addComment = (pageIndex: number, comment: string) => {
    dispatch({ type: 'ADD_COMMENT', payload: { pageIndex, comment } });
  };

  const voteComment = (
    pageIndex: number,
    commentId: number,
    action: 'up' | 'down'
  ) => {
    dispatch({ type: 'VOTE', payload: { pageIndex, commentId, action } });
  };

  const getCommentsForPage = (pageIndex: number): Comment[] => {
    return state.comments.get(pageIndex) || [];
  };

  const value: CommentContextType = {
    state,
    addComment,
    voteComment,
    getCommentsForPage,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
}
