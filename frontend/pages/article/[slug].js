import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.image);

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <hr className="uk-divider-small" />
          <ReactMarkdown source={article.content} escapeHtml={false} />

          <hr className="uk-divider-small" />
          <h1>Let's Rock</h1>
          <h2>Problématiques principales</h2>
          <ul>
            <li>probleme 1</li>
            <li>probleme 2</li>
          </ul>
          <p>
            Chez Sparkmate, notre approche de développement produit est
            focalisée sur le prototypage. On est persuadé que le meilleur moyen
            d’avancer efficacement sur un projet technique complexe, c’est
            d’avoir des itérations rapides et incrémentales du système dans son
            ensemble. En pratique on commence toujours par un milestone de
            design, puis on enchaîne sur des milestones de développement. Dans
            le cas de {article.title} et avec plusieurs briques technologiques
            et contraintes à traiter, cette approche prend tout son sens, car
            plus on retarde l’imbrication et l’intégration de blocs distincts,
            plus on accroît les probabilités de “mismatch” et de perturbations
            en fin de projet.{" "}
          </p>

          <hr className="uk-divider-small" />
          <h2>Nos principes de prototypage</h2>
          <ul>
            <li>
              Création de valeur : On délivre toujours des prototypes
              opérationnels (“You're better off with a kick-ass half than a
              half-assed whole.” as DHH says)
            </li>
            <li>
              Anticipation et démarche essais erreurs : On est ni devins, ni
              magiciens alors on itère, on teste et on améliore en permanence et
              le plus globalement possible
            </li>
            <li>
              100% de transparence et updates réguliers : On sait qu’une bonne
              collaboration client - prestataire sans friction repose sur la
              confiance, quand tout va bien ou quand les choses ne se passent
              pas comme prévu{" "}
            </li>
            <li>
              Approche centrée utilisateur : On garde toujours en tête que les
              produits ne vont pas être utilisé par nous ou par notre client
              mais le plus souvent par d’autres utilisateurs finaux{" "}
            </li>
          </ul>

          <h1>Bringing it to life</h1>
          <h2>Calendrier</h2>
          <ul>
            <li>Start date : </li>
            <li>End date : </li>
          </ul>
          <hr className="uk-divider-small" />

          <h2>Milestone 0</h2>
          <p>Etude technique et réalisation bout-en-bout d’un POC du système</p>
          <h3>Objectifs</h3>
          <p>
            <ul>
              <li>Objectif 1 </li>
              <li>Objectif 2 </li>
            </ul>
          </p>
          <h3>Livrables</h3>
          <p>
            <ul>
              <li>Livrable 1 </li>
              <li>Livrable 2 </li>
            </ul>
          </p>
          <hr className="uk-divider-small" />

          <h2>Milestone 1</h2>
          <p>Etude technique et réalisation bout-en-bout d’un POC du système</p>
          <h3>Objectifs</h3>
          <p>
            <ul>
              <li>Objectif 1 </li>
              <li>Objectif 2 </li>
            </ul>
          </p>
          <h3>Livrables</h3>
          <p>
            <ul>
              <li>Livrable 1 </li>
              <li>Livrable 2 </li>
            </ul>
          </p>
          <hr className="uk-divider-small" />

          <h1>It´s On</h1>
          <h2>Chiffrage</h2>
          <ul>
            <li>Milestone 1</li>
            <li>Milestone 2</li>
          </ul>
          <hr className="uk-divider-small" />

          <h2>Team</h2>
          <ul>
            <li>Team 1</li>
            <li>Team 2</li>
          </ul>

          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.author.picture && (
                <Image
                  image={article.author.picture}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.author.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles");

  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articles = await fetchAPI(
    `/articles?slug=${params.slug}&status=published`
  );
  const categories = await fetchAPI("/categories");

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  };
}

export default Article;
