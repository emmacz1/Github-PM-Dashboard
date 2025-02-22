"""Initial migration

Revision ID: 9deeec95e9c8
Revises: 
Create Date: 2024-06-15 03:34:28.296615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9deeec95e9c8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('issue',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('owner', sa.String(length=100), nullable=False),
    sa.Column('repo', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('issue')
    # ### end Alembic commands ###
