import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

const Post: NextPage = () => {
    const router = useRouter();
    const { id } = router.query
    return (
        <h1>{id}</h1>
    )

 }

export default Post;