import styles from './Developer.module.css'

function Developer({ dev }) {


    return (
        <div className={styles.main_container}>
            <img src={`https://avatars.githubusercontent.com/${dev.social_media.github_nick}`} width={'80px'} alt="Logo do Github" />
            <span>{dev.name}</span>
            <div className={styles.socialMediaContainer}>
                <a href={`https://github.com/${dev.social_media.github_nick}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={`https://instagram.com/${dev.social_media.instagram_nick}`}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M11.997 2.04c-2.715 0-3.056.011-4.122.06-1.064.048-1.79.217-2.426.463a4.901 4.901 0 0 0-1.771 1.151 4.89 4.89 0 0 0-1.153 1.767c-.247.635-.416 1.36-.465 2.422C2.011 8.967 2 9.307 2 12.017s.011 3.049.06 4.113c.049 1.062.218 1.787.465 2.422a4.89 4.89 0 0 0 1.153 1.767 4.901 4.901 0 0 0 1.77 1.15c.636.248 1.363.416 2.427.465 1.066.048 1.407.06 4.122.06s3.055-.012 4.122-.06c1.064-.049 1.79-.217 2.426-.464a4.901 4.901 0 0 0 1.77-1.15 4.89 4.89 0 0 0 1.154-1.768c.247-.635.416-1.36.465-2.422.048-1.064.06-1.404.06-4.113 0-2.71-.012-3.05-.06-4.114-.049-1.062-.218-1.787-.465-2.422a4.89 4.89 0 0 0-1.153-1.767 4.901 4.901 0 0 0-1.77-1.15c-.637-.247-1.363-.416-2.427-.464-1.067-.049-1.407-.06-4.122-.06m0 1.797c2.67 0 2.985.01 4.04.058.974.045 1.503.207 1.856.344.466.181.8.397 1.15.746.349.35.566.682.747 1.147.137.352.3.88.344 1.853.048 1.052.058 1.368.058 4.032 0 2.664-.01 2.98-.058 4.031-.044.973-.207 1.501-.344 1.853a3.09 3.09 0 0 1-.748 1.147c-.35.35-.683.565-1.15.746-.352.137-.88.3-1.856.344-1.054.048-1.37.058-4.04.058-2.669 0-2.985-.01-4.039-.058-.974-.044-1.504-.207-1.856-.344a3.098 3.098 0 0 1-1.15-.746 3.09 3.09 0 0 1-.747-1.147c-.137-.352-.3-.88-.344-1.853-.049-1.052-.059-1.367-.059-4.031 0-2.664.01-2.98.059-4.032.044-.973.207-1.501.344-1.853a3.09 3.09 0 0 1 .748-1.147c.35-.349.682-.565 1.149-.746.352-.137.882-.3 1.856-.344 1.054-.048 1.37-.058 4.04-.058"></path><path d="M11.997 15.342a3.329 3.329 0 0 1-3.332-3.325 3.329 3.329 0 0 1 3.332-3.326 3.329 3.329 0 0 1 3.332 3.326 3.329 3.329 0 0 1-3.332 3.325m0-8.449a5.128 5.128 0 0 0-5.134 5.124 5.128 5.128 0 0 0 5.134 5.123 5.128 5.128 0 0 0 5.133-5.123 5.128 5.128 0 0 0-5.133-5.124m6.536-.203c0 .662-.537 1.198-1.2 1.198a1.198 1.198 0 1 1 1.2-1.197"></path></svg>
                </a>
            </div>
        </div>
    )
}

export default Developer