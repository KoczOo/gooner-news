export default interface Article {
    id: string,
    postTitle: string;
    postSubTitle: string;
    postText: string;
    editor: string;
    postRating: number;
    postImg: string;
    timestamp: string;
    owner: Owner;
}

interface Owner {
    firstName: string;
    lastName: string;
}
