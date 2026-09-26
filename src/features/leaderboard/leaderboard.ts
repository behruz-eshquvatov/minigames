import './leaderboard.scss';
import leaderboardData from '../../tasks/mock-data/leaderboard.json';

export interface LeaderboardItem {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}

const AVATAR_COLORS: Record<number, string> = {
  1: '#FFD02B', // Yellow
  2: '#A3E2C9', // Green
  3: '#BCE3FF', // Light Blue
  4: '#FFC6FF', // Pink
  5: '#E6DFF5', // Lavender
};

function getInitials(name: string): string {
  const parts = name.split('_');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatScore(score: number, isMobile: boolean): string {
  if (isMobile) {
    return `${(score / 1000).toFixed(1)}K`;
  }
  return score.toLocaleString('en-US');
}

export class Leaderboard {
  private element: HTMLElement;

  public constructor() {
    this.element = this.createLeaderboardElement();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private createLeaderboardElement(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'leaderboard-section';

    const items: LeaderboardItem[] = leaderboardData.data as LeaderboardItem[];

    section.innerHTML = `
      <div class="leaderboard-section__container">
        <div class="leaderboard-section__header">
          <h2 class="leaderboard-section__title">
            <span class="leaderboard-section__title-pill"></span>
            <span class="title-desktop">Top Players This Week</span>
            <span class="title-mobile">Top Players</span>
          </h2>
        </div>

        <div class="leaderboard-table-card">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th class="col-rank">RANK</th>
                <th class="col-player">PLAYER</th>
                <th class="col-games">
                  <span class="th-desktop">GAMES PLAYED</span>
                  <span class="th-mobile">GAMES</span>
                </th>
                <th class="col-score">
                  <span class="th-desktop">TOTAL SCORE</span>
                  <span class="th-mobile">SCORE</span>
                </th>
                <th class="col-streak">STREAK</th>
                <th class="col-favorite">FAVORITE GAME</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item: LeaderboardItem): string => `
                <tr class="leaderboard-row leaderboard-row--rank-${item.rank}">
                  <td class="col-rank">
                    <span class="rank-badge rank-badge--${item.rank}">#${item.rank}</span>
                  </td>
                  <td class="col-player">
                    <div class="player-info">
                      <span class="player-avatar" style="background-color: ${AVATAR_COLORS[item.rank] || '#E0EEF6'}">
                        ${getInitials(item.playerName)}
                      </span>
                      <span class="player-name">${item.playerName}</span>
                    </div>
                  </td>
                  <td class="col-games">${item.gamesPlayed}</td>
                  <td class="col-score">
                    <span class="score-desktop">${formatScore(item.totalScore, false)}</span>
                    <span class="score-mobile">${formatScore(item.totalScore, true)}</span>
                  </td>
                  <td class="col-streak">
                    <span class="streak-full">🔥 ${item.streakDays} days</span>
                    <span class="streak-short">🔥 ${item.streakDays}d</span>
                  </td>
                  <td class="col-favorite">
                    <span class="favorite-badge">${item.favoriteGameName}</span>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return section;
  }
}
