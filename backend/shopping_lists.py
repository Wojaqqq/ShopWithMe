from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields
from models import ShoppingList

shopping_list_ns = Namespace('shopping_list', description="A namespace for shopping lists")


shopping_list_model = shopping_list_ns.model(
    "ShoppingList",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)


@shopping_list_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@shopping_list_ns.route('/shopping_lists')
class ShoppingListsResource(Resource):

    @shopping_list_ns.marshal_list_with(shopping_list_model)
    def get(self):
        """ Get all shopping lists """
        shopping_lists = ShoppingList.query.all()
        return shopping_lists

    @shopping_list_ns.expect(shopping_list_model)
    # @shopping_list_ns.marshal_with(shopping_list_model)
    @jwt_required()
    def post(self):
        """ Create a new shopping list """

        data = request.get_json()
        new_shopping_list = ShoppingList(
            title=data.get('title'),
            description=data.get('description')
        )
        new_shopping_list.save()
        return make_response(jsonify({"message": "New shopping list created"}), 201)


@shopping_list_ns.route('/shopping_list/<int:list_id>')
class ShoppingListResource(Resource):

    @shopping_list_ns.marshal_with(shopping_list_model)
    def get(self, list_id):
        """ Get a shopping list by id """
        shopping_list = ShoppingList.query.get_or_404(list_id)
        print(type(shopping_list), flush=True)
        return shopping_list

    @shopping_list_ns.marshal_with(shopping_list_model)
    @jwt_required()
    def put(self, list_id):
        """ Update shopping list by id """

        shopping_list_to_update = ShoppingList.query.get_or_404(list_id)

        data = request.get_json()
        shopping_list_to_update.update(data.get('title'), data.get('description'))

        return shopping_list_to_update

    @shopping_list_ns.marshal_with(shopping_list_model)
    @jwt_required()
    def delete(self, list_id):
        """ Delete a shopping list by id """

        shopping_list_to_delete = ShoppingList.query.get_or_404(list_id)
        shopping_list_to_delete.delete()

        return shopping_list_to_delete
