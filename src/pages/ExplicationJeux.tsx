import React from 'react';
import ReturnButton from "src/components/Shared/ReturnButton";
import Title from "src/components/Shared/Title";

const ExplicationJeux: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto py-12">
        <Title text="Règles des Échecs" />

        <table className="w-full text-sm text-left text-gray-400 mt-8 rounded-lg overflow-hidden shadow-lg">
          <thead className="text-xs uppercase bg-gray-800 text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Pièce</th>
              <th scope="col" className="px-6 py-3">Mouvement</th>
              <th scope="col" className="px-6 py-3">Particularités</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-900 hover:bg-gray-800 transition">
              <td className="px-6 py-4">Roi</td>
              <td className="px-6 py-4">1 case dans toutes les directions</td>
              <td className="px-6 py-4">Roque, ne peut être mangé, ne peut être adjacent à un autre roi, peut être mis en échec</td>
            </tr>
            <tr className="bg-gray-800 hover:bg-gray-700 transition">
              <td className="px-6 py-4">Dame</td>
              <td className="px-6 py-4">Toutes les distances en ligne droite (horizontal, vertical, diagonal)</td>
              <td className="px-6 py-4">Pièce la plus puissante</td>
            </tr>
            <tr className="bg-gray-900 hover:bg-gray-800 transition">
              <td className="px-6 py-4">Tour</td>
              <td className="px-6 py-4">Toutes les distances en ligne droite (horizontal ou vertical)</td>
              <td className="px-6 py-4">Impliquée dans le roque</td>
            </tr>
            <tr className="bg-gray-800 hover:bg-gray-700 transition">
              <td className="px-6 py-4">Fou</td>
              <td className="px-6 py-4">Toutes les distances en diagonale</td>
              <td className="px-6 py-4">Reste toujours sur la même couleur de cases</td>
            </tr>
            <tr className="bg-gray-900 hover:bg-gray-800 transition">
              <td className="px-6 py-4">Cavalier</td>
              <td className="px-6 py-4">En "L" (2 cases dans une direction, puis 1 perpendiculairement)</td>
              <td className="px-6 py-4">Peut sauter par-dessus les autres pièces</td>
            </tr>
            <tr className="bg-gray-800 hover:bg-gray-700 transition">
              <td className="px-6 py-4">Pion</td>
              <td className="px-6 py-4">1 case vers l'avant (2 au premier coup), capture en diagonale</td>
              <td className="px-6 py-4">Promotion en atteignant la dernière rangée, prise en passant</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-3xl font-bold text-center text-blue-500 mt-12 mb-6">
          Autres règles importantes
        </h2>
        <ul className="text-gray-300 space-y-4">
          <li><strong className="text-sm uppercase text-gray-400">Échec et mat :</strong> Le but du jeu est de mettre le roi adverse en échec et mat, c'est-à-dire dans une position où il ne peut ni se déplacer ni être protégé.</li>
          <li><strong className="text-sm uppercase text-gray-400">Pat :</strong> Si aucun des deux joueurs ne peut mettre l'autre en échec et que le joueur à qui c'est le tour n'a aucun coup légal, la partie est nulle.</li>
          <li><strong className="text-sm uppercase text-gray-400">Roque :</strong> Un mouvement combiné du roi et d'une tour. Les conditions pour roquer sont : le roi et la tour n'ont jamais bougé, il n'y a aucune pièce entre le roi et la tour, et le roi ne traverse ni ne met en échec une case attaquée par une pièce adverse.</li>
          <li><strong className="text-sm uppercase text-gray-400">Promotion :</strong> Lorsqu'un pion atteint la dernière rangée, il peut être promu en dame, tour, fou ou cavalier.</li>
          <li><strong className="text-sm uppercase text-gray-400">Prise en passant :</strong> Un pion peut capturer un pion adverse qui a avancé de deux cases, comme s'il avait avancé d'une seule.</li>
        </ul>
      </div>

      <ReturnButton />
    </div>
  );
};

export default ExplicationJeux;
